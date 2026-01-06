'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Eye, Check, X, MoreVertical, Loader2 } from 'lucide-react';
import { useAdminUsers } from '@/apps/admin/hooks/useAdminUsers';

export default function Professionnels() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tous');
    const { users, loading, error, validateUser, suspendUser } = useAdminUsers();

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'Tous' || user.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-[#235730] animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
                Erreur lors de la récupération des professionnels : {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl text-gray-900 mb-2">Professionnels</h1>
                <p className="text-gray-600">Gérer les comptes professionnels ({users.length})</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, entreprise ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
                    >
                        <option value="Tous">Tous les statuts</option>
                        <option value="Validé">Validé</option>
                        <option value="En attente">En attente</option>
                        <option value="Suspendu">Suspendu</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Validés</p>
                    <p className="text-2xl font-bold text-green-600">
                        {users.filter((u) => u.status === 'Validé').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">En attente</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {users.filter((u) => u.status === 'En attente').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Suspendus</p>
                    <p className="text-2xl font-bold text-red-600">
                        {users.filter((u) => u.status === 'Suspendu').length}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Professionnel</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Entreprise</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">SIRET</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Remise</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Date Inscr.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        Aucun professionnel trouvé
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{user.company}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{user.siret}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${user.status === 'Validé'
                                                        ? 'bg-green-100 text-green-700'
                                                        : user.status === 'En attente'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{user.remise}%</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/professionnels/${user.id}`}
                                                    className="p-2 text-gray-600 hover:text-[#235730] hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                {user.status === 'En attente' && (
                                                    <>
                                                        <button
                                                            onClick={() => validateUser(user.id)}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Valider le compte"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => suspendUser(user.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Rejeter / Suspendre"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                {user.status === 'Validé' && (
                                                    <button
                                                        onClick={() => suspendUser(user.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Suspendre le compte"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
